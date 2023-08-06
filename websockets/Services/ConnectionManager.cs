using System.Collections.Concurrent;
using System.Net.WebSockets;

public  class ConnectionManager
{
    protected ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

    public WebSocket GetSocketById(string id)
    {
        return _sockets.FirstOrDefault(p => p.Key == id).Value;
    }

    public ConcurrentDictionary<string, WebSocket> GetAll()
    {
        return _sockets;
    }

    public int GetCount()
    {
        return _sockets.Count;
    }

    public string GetId(WebSocket socket)
    {

        return _sockets.FirstOrDefault(p => p.Value == socket).Key;
    }

    public void AddSocket(WebSocket socket)
    {



        _sockets.TryAdd(CreateConnectionId(), socket);


    }

    public async Task RemoveSocket(string id)
    {
        WebSocket socket;

        _sockets.TryRemove(id, out socket);

        await socket.CloseAsync(closeStatus: WebSocketCloseStatus.NormalClosure,
                                statusDescription: "Closed by the ConnectionManager",
                                cancellationToken: CancellationToken.None);
    }

    protected string CreateConnectionId()
    {
        return Guid.NewGuid().ToString();
    }

    public void AddWithId(WebSocket socket, string id)
    {
        _sockets.TryAdd(id + CreateConnectionId(), socket);
    }
}
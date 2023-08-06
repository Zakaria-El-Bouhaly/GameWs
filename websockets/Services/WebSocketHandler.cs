using System.Net.WebSockets;
using System.Text;
using lesgo.Domain.Dto;
using lesgo.Dto;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace lesgo.Services
{
    public class WebSocketHandler
    {
        protected ConnectionManager WebSocketConnectionManager { get; set; }
        private Random random = new Random();

        public WebSocketHandler(ConnectionManager webSocketConnectionManager)
        {
            WebSocketConnectionManager = webSocketConnectionManager;
        }

        public virtual async Task OnConnected(WebSocket socket)
        {
            WebSocketConnectionManager.AddSocket(socket);
        }


        public virtual async Task OnDisconnected(WebSocket socket)
        {
            await WebSocketConnectionManager.RemoveSocket(WebSocketConnectionManager.GetId(socket));
        }

        public async Task SendMessageAsync(WebSocket socket, string message)
        {


            MessageDto messageDto = new MessageDto(message);

            //send json
            string jsonMessage = JsonConvert.SerializeObject(messageDto);

            if (socket.State != WebSocketState.Open)
                return;

            await socket.SendAsync(buffer: new ArraySegment<byte>(
                Encoding.ASCII.GetBytes(jsonMessage), 0, jsonMessage.Length),
                                     WebSocketMessageType.Text,
                                     true,
                                     CancellationToken.None);
        }


        public async Task SendMessageToAllAsync(string message)
        {
            foreach (var pair in WebSocketConnectionManager.GetAll())
            {
                if (pair.Value.State == WebSocketState.Open)
                    await SendMessageAsync(pair.Value, message);
            }
        }




        public async Task<string> StartGame(WebSocket socket)
        {
            int rdmId = random.Next(1000, 9999);

            try
            {
                WebSocketConnectionManager.AddWithId(socket, rdmId.ToString());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            JObject jObject = new JObject();
            jObject.Add("code", rdmId.ToString());
            jObject.Add("playerCount", WebSocketConnectionManager.GetCountWithId(rdmId.ToString()));

            WsRequest wsRequest = new WsRequest("connected", JsonConvert.SerializeObject(jObject));

            await SendMessageAsync(socket, JsonConvert.SerializeObject(wsRequest));
            return rdmId.ToString();
        }



        public async Task<string> JoinGame(WebSocket socket, string id)
        {
            WebSocketConnectionManager.AddWithId(socket, id);

            JObject jObject = new JObject();
            jObject.Add("id", id);
            jObject.Add("playerCount", WebSocketConnectionManager.GetCountWithId(id));
            WsRequest wsRequest = new WsRequest("joined", JsonConvert.SerializeObject(jObject));

            await SendToAllById(id, JsonConvert.SerializeObject(wsRequest));
            return id;
        }

        public async Task SendToAllById(string gameId, string message)
        {
            foreach (var pair in WebSocketConnectionManager.GetAll())
            {
                if (pair.Value.State == WebSocketState.Open && pair.Key.StartsWith(gameId))
                    await SendMessageAsync(pair.Value, message);
            }
        }


    }
}
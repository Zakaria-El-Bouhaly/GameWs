using System.Net.WebSockets;
using System.Text;
using lesgo.Domain.Dto;
using lesgo.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace lesgo.Controllers
{



    public class WebSocketController : ControllerBase
    {
        private readonly WebSocketHandler _webSocketHandler;
        private readonly UserActionHandler _userActionHandler;



        public WebSocketController(WebSocketHandler webSocketHandler, UserActionHandler userActionHandler)
        {
            _webSocketHandler = webSocketHandler;
            _userActionHandler = userActionHandler;
        }

        [Route("/start")]
        public async Task Get()
        {


            var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            await _webSocketHandler.OnConnected(socket);

            await ReceiveMessages(socket);
        }

        private async Task ReceiveMessages(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None);


            while (!receiveResult.CloseStatus.HasValue)
            {

                receiveResult = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);


                try
                {
                    string msgContent = Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);
                    Console.WriteLine("msgContent: " + msgContent.Length);
                    WsRequest? request = JsonConvert.DeserializeObject<WsRequest>(msgContent);

                    await _userActionHandler.Handle(webSocket, request);
                }
                catch (Exception e)
                {
                    Console.WriteLine("error parsing json");
                }
            }

            await _webSocketHandler.OnDisconnected(webSocket);

        }

    }

}
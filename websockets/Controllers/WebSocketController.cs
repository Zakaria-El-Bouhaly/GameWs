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
        private readonly WebSocketHandler _gamewebSocketHandler;
        private readonly UserActionHandler _userActionHandler;



        public WebSocketController(WebSocketHandler gameWsHandler, UserActionHandler userActionHandler)
        {
            _gamewebSocketHandler = gameWsHandler;
            _userActionHandler = userActionHandler;
        }

        [Route("/start/{id?}")]
        public async Task Get(string? id)
        {

            var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            string gameId = string.Empty;
            // get the id from the query string            
            if (id != null)
            {
                gameId = await _gamewebSocketHandler.JoinGame(socket, id);
            }
            else
            {
                gameId = await _gamewebSocketHandler.StartGame(socket);
            }

            await ReceiveMessages(socket, gameId);
        }

        private async Task ReceiveMessages(WebSocket webSocket, string gameId)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None);

            _userActionHandler.SetGameId(gameId);


            while (!receiveResult.CloseStatus.HasValue)
            {

                receiveResult = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);


                try
                {
                    string msgContent = Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);

                    WsRequest? request = JsonConvert.DeserializeObject<WsRequest>(msgContent);

                    await _userActionHandler.Handle(request);
                }
                catch (Exception e)
                {

                }
            }

            try
            {

                await _gamewebSocketHandler.OnDisconnected(webSocket);
            }
            catch (Exception e)
            {

            }

        }




    }

}
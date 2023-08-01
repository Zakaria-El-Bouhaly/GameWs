using System.Net.WebSockets;
using lesgo.Domain.Dto;
using Newtonsoft.Json;

namespace lesgo.Services
{
    public class UserActionHandler
    {

        private readonly WebSocketHandler _webSocketHandler;
        private readonly GameService _gameService;

        public UserActionHandler(WebSocketHandler webSocketHandler, GameService gameService)
        {
            _webSocketHandler = webSocketHandler;
            _gameService = gameService;
        }

        public async Task Handle(WebSocket webSocket, WsRequest request)
        {
            switch (request.Action)
            {
                case "selectBox":
                    int[] board = _gameService.GetBoard();
                    int selected = int.Parse(request.Data);
                    _gameService.SelectBox(selected);
                    await send("selectBox", JsonConvert.SerializeObject(board));
                    break;
                default:
                    break;
            }

        }

        public async Task send(string action, string data)
        {
            WsRequest response = new WsRequest();
            response.Action = action;
            response.Data = data;
            string responseString = JsonConvert.SerializeObject(response);
            await _webSocketHandler.SendMessageToAllAsync(responseString);
        }
    }
}
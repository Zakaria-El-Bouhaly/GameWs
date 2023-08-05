using System.Net.WebSockets;
using lesgo.Domain.Dto;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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


            if (request.Action == "startGame" || request.Action == "resetGame")
            {
                int[] amounts = _gameService.InitializeGame();
                JObject gameStatus = GameStatus();
                gameStatus.Add("amounts", JsonConvert.SerializeObject(amounts));
                await send("startGame", JsonConvert.SerializeObject(gameStatus));
            }

            if (request.Action == "selectBox")
            {
                int selected = int.Parse(request.Data);
                int amount = _gameService.SelectBox(selected);

                JObject gameStatus = GameStatus();
                gameStatus.Add("index", selected);
                gameStatus.Add("amount", amount);
                await send("revealBox", JsonConvert.SerializeObject(gameStatus));
            }

            if (request.Action == "makeOffer") // turn 2
            {
                await send("makeOffer", request.Data);
            }

            if (request.Action == "acceptOffer") // turn 1
            {
                _gameService.EndGame();
                JObject gameStatus = GameStatus();
                await send("acceptOffer", JsonConvert.SerializeObject(gameStatus));
            }

            if (request.Action == "refuseOffer") // turn 1
            {

                JObject gameStatus = GameStatus();
                await send("refuseOffer", JsonConvert.SerializeObject(gameStatus));
            }


            if (request.Action == "offerSwitch") // turn 2
            {

                string message = "would you like to switch?";
                await send("offerSwitch", message);
            }

            if (request.Action == "switchBox") // turn 1
            {
                int selected = int.Parse(request.Data);
                _gameService.SwitchBox(selected);
                JObject gameStatus = GameStatus();
                await send("swicthBox", JsonConvert.SerializeObject(gameStatus));
            }

            if (request.Action == "refuseSwitch")
            {
                _gameService.refuseSwitch();
                JObject gameStatus = GameStatus();
                await send("refuseSwitch", JsonConvert.SerializeObject(gameStatus));
            }

        }


        public JObject GameStatus()
        {
            JObject gameStatus = new JObject();
            gameStatus.Add("isStarted", _gameService.IsStarted());
            gameStatus.Add("isOver", _gameService.IsOver());
            gameStatus.Add("turn", _gameService.GetTurn());
            gameStatus.Add("movesCount", _gameService.GetMoves());

            return gameStatus;
        }

        public async Task send(string action, string data)
        {
            WsRequest response = new WsRequest(action, data);
            string responseString = JsonConvert.SerializeObject(response);
            await _webSocketHandler.SendMessageToAllAsync(responseString);
        }
    }
}
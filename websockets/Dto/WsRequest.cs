namespace lesgo.Domain.Dto
{
    public class WsRequest
    {
        public string Action { get; set; }
        public string Data { get; set; }

        public WsRequest( string action, string data)
        {
            Action = action;
            Data = data;
        }        
    }
}
namespace lesgo.Dto
{
    public class OfferState{
        public string state { get; set; }
        public int offerAmount { get; set; }

        public OfferState(string state, int offerAmount)
        {
            this.state = state;
            this.offerAmount = offerAmount;
        }
    }
}
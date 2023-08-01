namespace lesgo.Services
{
    public class GameService
    {
        public bool isOver = false;
        public Dictionary<int, int> amounts = new Dictionary<int, int>();

        public int selected = 0;

        public int movesCount = 0;

        public GameService()
        {
           amounts.Add(1,100);
           for (int i = 2; i <=20; i++)
           {
               amounts.Add(i, 100 * i);
           }
        }
            

        public bool IsOver()
        {
            return isOver;
        }

        public int  SelectBox(int index)
        {
           if (movesCount==0){
                selected = index;     
                movesCount++;     
                return 0;
           }    
           movesCount++;                
           return amounts[index];                    
                      
        }

    }
}
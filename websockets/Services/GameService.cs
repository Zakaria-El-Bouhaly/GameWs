namespace lesgo.Services
{
    public class GameService
    {
        private bool isStarted = false;
        private bool isOver = false;

        private int[] intialValues ={
            1, 10, 15, 20, 50, 100, 200, 250, 500,
            5000, 10000,15000, 20000, 50000, 70000, 100000,
            150000, 200000, 500000, 1000000
        };
        private Dictionary<int, int> amounts = new Dictionary<int, int>();
        private int moves = 0;

        private int selectedBox = 0;
        private int turn = 1;

        private Random rnd = new Random();

        public GameService()
        {
        }

        public int[]? InitializeGame()
        {



            // empty the dictionary
            amounts.Clear();
            moves = 0;

            // initialize the game
            isOver = false;
            isStarted = true;
            turn = 1;

            int nbrVals = intialValues.Length;

            // fill the dictionary with random amounts of money indexes 1-20            
            for (int i = 1; i <= nbrVals; i++)
            {

                int randomValue = intialValues[rnd.Next(0, nbrVals)];

                while (amounts.ContainsValue(randomValue))
                {
                    randomValue = intialValues[rnd.Next(0, nbrVals)];
                }

                amounts.Add(i, randomValue);
            }

            // values wihout keys 
            int[] availableAmounts = amounts.Values.ToArray();
            // sort the array
            Array.Sort(availableAmounts);

            return availableAmounts;

        }

        public int GetTurn()
        {
            return turn;
        }

        public int GetSelectedAmount()
        {
            return amounts[selectedBox];
        }

        public int GetMoves()
        {
            return moves;
        }

        public int[] GetAvailableAmounts()
        {
            int[] availableAmounts = amounts.Values.ToArray();
            Array.Sort(availableAmounts);
            return availableAmounts;
        }

        public bool IsOver()
        {
            return isOver;
        }

        public bool IsStarted()
        {
            return isStarted;
        }

        public int SelectBox(int index)
        {
            if (!IsAllowed() || turn == 2)
            {
                return -1;
            }

            moves++;

            if (moves == 1)
            {
                selectedBox = index;
                return 0;
            }

            if (moves == 20)
            {
                isOver = true;
                return -1;
            }

            if (moves % 4 == 0)
            {
                turn = 2;
                return amounts[index];
            }


            return amounts[index];

        }

        public void ignoreOffer()
        {
            if (IsAllowed() && turn == 2)
                turn = 1;
        }

        public void refuseOffer()
        {
            if (IsAllowed() && turn == 2)
                turn = 1;
        }

        public void EndGame()
        {
            if (IsAllowed())
            {
                isOver = true;
                isStarted = false;
            }
        }

        // validate the user's move
        public bool IsAllowed()
        {
            return (!isOver && isStarted);

        }

    }
}
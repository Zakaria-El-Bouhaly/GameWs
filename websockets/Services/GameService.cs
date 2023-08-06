namespace lesgo.Services
{
    public class GameService
    {
        private bool isStarted = false;
        private bool isOver = false;
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

            // fill the dictionary with random amounts of money indexes 1-20            
            for (int i = 1; i <= 20; i++)
            {
                amounts.Add(i, rnd.Next(1, 100000));
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

            if (moves % 4 == 0)
            {
                turn = 2;
                return amounts[index];
            }

            if (moves == 20)
            {
                isOver = true;
                return -1;
            }

            return amounts[index];

        }


        public void refuseOffer()
        {
            if (IsAllowed() && turn == 2)
                turn = 1;
        }

        public void EndGame()
        {
            if (IsAllowed())
                isOver = true;
        }

        // validate the user's move
        public bool IsAllowed()
        {
            return (!isOver && isStarted);

        }

    }
}
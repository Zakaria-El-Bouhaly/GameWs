namespace lesgo.Services
{
    public class GameService
    {
        public bool isStarted = false;
        public bool isOver = false;
        public Dictionary<int, int> amounts = new Dictionary<int, int>();
        public int moves = 0;

        public int selectedBox = 0;
        public int turn = 1;

        Random rnd = new Random();

        public GameService()
        {
        }

        public int[] InitializeGame()
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
            if (isOver || !isStarted || turn == 2)
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
                return 0;
            }

            if (moves == 20)
            {
                isOver = true;
                return 0;
            }

            return amounts[index];

        }


        public void refuseOffer()
        {
            // if (isOver || !isStarted || turn == 1)
            // {
            //     return;
            // }

            turn = 1;
        }

        public void SwitchBox(int newBox)
        {
            // if (isOver || !isStarted || turn == 2)
            // {
            //     return;
            // }

            selectedBox = newBox;
            turn = 1;

        }

        public void refuseSwitch()
        {
            // if (isOver || !isStarted || turn == 1)
            // {
            //     return;
            // }

            turn = 1;
        }
        public void EndGame()
        {
            // if (isOver || !isStarted || turn == 1)
            // {
            //     return;
            // }

            isOver = true;
        }

    }
}
namespace lesgo.Services
{
    public class GameService
    {
        public bool isOver = false;
        public int[] board = new int[25];

        public int selected = 0;

        public GameService()
        {
            board[0] = 1;
            for (int i = 1; i < 25; i++)
            {
                board[i] = board[i - 1] * 2 ;
            }
        }

        public int[] GetBoard()
        {
            return board;
        }

        public int getBoardValue(int index)
        {
            return board[index];
        }

        

        public bool IsOver()
        {
            return isOver;
        }

        public void SelectBox(int index)
        {
            selected = index;
        }

    }
}
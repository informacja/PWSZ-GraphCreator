using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using System.Threading;
using System.Text.RegularExpressions;

//using System.Text;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            this.button1_Click(this, null);                     // naciśnij przycisk przy uruchamianiu
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            string path = pathEdit.Text;
            //File.Open("info.txt", System.IO.FileMode.CreateNew );
     
            if (!File.Exists(path))
            {
                this.pathEdit.Text = "Nie ma takiego pliku";
                Thread.Sleep(500);
                this.pathEdit.Text = path;
                return;
            }

            Regex rx = new Regex("[0-9]+\\s*", RegexOptions.Compiled | RegexOptions.IgnoreCase);

            StreamReader reader = File.OpenText(path);

            string line = reader.ReadLine();
            MatchCollection matches = rx.Matches(line);

            Console.WriteLine("{0} matches found in:\n   {1}", matches.Count, line);

            if (matches.Count != 2)
            {
                MessageBox.Show( "Niepoprawny nagłówek pliku. (2) = "+ matches.Count );
                return;
            }

            string[] vertices_edges = line.Split(' ');
            //MessageBox.Show(vertices_edges[1]);       // ok 10
            Graph graph = new Graph( Int32.Parse(vertices_edges[0]), Int32.Parse(vertices_edges[1]));
            int i = 0;
            while ((line = reader.ReadLine()) != null)
            {
                richTextBox1.Text += line + "\n";

                Console.WriteLine("{0} matches found in:\n   {1}", matches.Count, line);

                matches = rx.Matches(line);
                if (matches.Count != 3) // z nru grafu, do numru, waga; nie zostały poprawnie podane
                    continue;

                string[] items = line.Split(' ');

                graph.edge[i].src = Int32.Parse(items[0]);
                graph.edge[i].dest = Int32.Parse(items[1]);
                graph.edge[i].weight = Int32.Parse(items[2]);
                
                if (i++ > graph.getE())
                { 
                    MessageBox.Show("Błąd: liczba ścieżek większa od zadeklarowanej =" + i);
                    return;
                }                
            }
            int[] a = graph.BellmanFord(graph, 0);
            richTextBox1.Text += "\n";

            for(int k = 0; k < graph.getV(); k++)   // wyniki
            {
                richTextBox1.Text += a[k]+"\n";
            }
            //Graph.doit();
        }
    }
}

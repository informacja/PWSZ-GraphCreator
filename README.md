# <a href="https://informacja.github.io/PWSZ-GraphCreator/">PWSZ-GraphCreator</a>

### Schemat pliku wejściowego:
Plik wejściowy zawiera informacje o połączeniach program sam ustala liczbę wierzchołków i krawędzi.<br>
Każdy wiersz zawierają informacje o krawędzi:<br>
wierzchołek <b>początkowy</b>, <b>końcowy</b> oraz <b>wagę</b> krawędzi                                                                             
<img style="display: inlinie;" src="/img/in.png"> </img>
<img src="/img/graph.png"> </img><br>
Jako tekst widzimy wczytane plik, po pustej lini jest odległośc do każdego kolejnego wierzchołka.<br>
<img src="/img/app.png"> </img>
<br>
https://csacademy.com/app/graph_editor/

## Istotne pliki
<i> Graph.cs</i> - klasa szukająca najkrótszego obwodu metodą Bellmana-Forda <br>
W pliku Form1.cs metoda <i> private void button1_Click(object sender, EventArgs e)</i> - odpowiada za wczytywanie danych z pliku <br>
Pozostałe pliki są nieistotne

# Done
_wybrać nazwę_
<img src="img/1.png"> </img>

<img src="img/2.png"> </img>

<img src="img/3.png"> </img>
=======
PWSZ - Graph Creator

#How to use
-------
- Use left mause button to create new node
- Click node and move mause pointer to next node to link them
- Use key "R" to change direction of link
- Use key "Delete" to remove selected node or link

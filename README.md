# <a href="https://informacja.github.io/PWSZ-GraphCreator/">PWSZ-GraphCreator</a>

<a href="https://l.messenger.com/l.php?u=https%3A%2F%2Fpythex.org%2F%3Fregex%3D(%255Cd%252B%255Cs%252B%255Cd%252B%255Cs%252B(%253F%253A(%253F%253A%255Cd%252B%255C.%255Cd%252B)%257C%255Cd%252B))(%253F%253A%255C.[%255CS%255Cd]%252B)*%26test_string%3D015%2520%252031%2520333.33.4error4%250A4%252046%25204%25205%25204%250A4%2520%2520034%252035%250A4444%2520%2520%250A5%25204%25205.5%25201%26ignorecase%3D0%26multiline%3D0%26dotall%3D0%26verbose%3D1&h=AT2pACHo1esgbPofN-kACLkB6Vok6jLe6mbi_-x5gWY1H5qGCzLEmwxAmKlqY3m43u1V789Y22wkaA64Odx4r07QBisTFLnSJz_UNicvCrWGMY5oD9w1lR04IuDbvU2kSU-zLM9j-tJYewr5W9l-_Q"
> regex </a>
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

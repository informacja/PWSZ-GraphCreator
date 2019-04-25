
using UnityEngine;
using UnityEngine.UI;
using CodeMonkey.Utils; //imported utils from https://unitycodemonkey.com

public class Window_Graph : MonoBehaviour {

    [SerializeField] private Sprite circleSprite; //Sprite of Point
    private RectTransform graphContainer;

    private float ContainerHeight; // Height of algContainer
    private float ContainerWidth; // Width of algContainer


    private void Awake() {
        graphContainer = transform.GetComponent<RectTransform>(); // Information about this Object   
        RectTransform rt = (RectTransform)graphContainer.transform; // Information about algContainer  
        
        //Getting size of Container
        ContainerHeight = rt.rect.width; 
        ContainerWidth = rt.rect.height;


        // Testing zone :D
		// 
        float[][]ArrayOfPoint = new float[][]{ new float[] { 100,0}, new float[]{ 100, 100 },new float[]{0,0}, new float[] {0,100}};
		
	
		GameObject last = DrawPoint(Scale(10, 50));
        GameObject now;
        foreach (float[] point in ArrayOfPoint)
        {
            now = DrawPoint( Scale(point[0], point[1]));
            CreatePointConnection(last.GetComponent<RectTransform>().anchoredPosition, now.GetComponent<RectTransform>().anchoredPosition);
            last = now;
        }
    }

    private Vector2 Scale(float x, float y) //Rensponsive points
    {
        return new Vector2(x * ContainerWidth / 120, y * ContainerHeight / 120);
    }

    private GameObject DrawPoint(Vector2 anchoredPosition) {
        GameObject gameObject = new GameObject("circle", typeof(Image)); // name and type of object
        gameObject.transform.SetParent(graphContainer, false); // graphContainer is father for new Object
        gameObject.GetComponent<Image>().sprite = circleSprite; // import image as texture to new object

        //position/thickness/anchor of point
        RectTransform rectTransform = gameObject.GetComponent<RectTransform>();
        rectTransform.anchoredPosition = anchoredPosition; 
        rectTransform.sizeDelta = new Vector2(25, 25);
        rectTransform.anchorMin = new Vector2(0, 0);
        rectTransform.anchorMax = new Vector2(0, 0);

        return gameObject;
    }
   
    private void CreatePointConnection(Vector2 dotPositionA, Vector2 dotPositionB)
    {
        GameObject gameObject = new GameObject("dotConnection", typeof(Image)); // name and type of object
        gameObject.transform.SetParent(graphContainer, false); // graphContainer is father for new Object
        gameObject.GetComponent<Image>().color = new Color(1, 1, 1, .5f);  // setting color



        //position/thickness/anchor of point
        Vector2 dir = (dotPositionB - dotPositionA).normalized;
		
        float distance = Vector2.Distance(dotPositionA, dotPositionB);
		
        RectTransform rectTransform = gameObject.GetComponent<RectTransform>();
		
        rectTransform.anchoredPosition = dotPositionA + dir * distance * .5f;
		
        rectTransform.sizeDelta = new Vector2(distance, 3f);
        rectTransform.anchorMin = new Vector2(0, 0);
        rectTransform.anchorMax = new Vector2(0, 0);
        rectTransform.localEulerAngles = new Vector3(0, 0, UtilsClass.GetAngleFromVectorFloat(dir));

    }

}

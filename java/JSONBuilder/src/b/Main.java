package b;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;


public class Main {
	public static void main(String[] args) throws IOException, JSONException, CsvException {
		
		/* 
		/home/bian/Downloads/csv.csv
		/home/bian/Desktop/Summer/output.json
		*/ 
			 
		System.out.print("CSV Input Path: "); 
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		String path = reader.readLine();
		System.out.print("JSON Output Path: ");
		String outputPath = reader.readLine(); 
		BufferedReader br = new BufferedReader(new FileReader(path));
		String newLine; 
		
		ArrayList lines = new ArrayList<String>();
		newLine = br.readLine();
		List<String> tList = new ArrayList <String>();
		String temptemp = newLine; 
		tList = Arrays.asList(temptemp.split(","));
		// System.out.println(tList.size());
		String[] categoryArray = new String[tList.size()];
		tList.toArray(categoryArray);

		// String[] categoryArray = {"timestamp", "title", "choices",
			// 	"correct", "difficulty","solution", "category"};
		
		 FileReader filereader = new FileReader(path);
		 CSVParser parser = new CSVParserBuilder().withSeparator(',').build();
		 CSVReader csvReader = new CSVReaderBuilder(filereader)
	             .withCSVParser(parser)
	             .build();
	     String[] nextRecord;
	     csvReader.readNext(); 
	     List<String[]> allData = csvReader.readAll();
		String[][] questionArray = new String[allData.size()][7];
	     for (int i = 0 ; i < allData.size(); i++) {
	    	 for (int j = 0; j < allData.get(0).length; j++) {
	    		questionArray[i][j] = allData.get(i)[j]; 
	    	 }
	     }
		for (int i = 0; i < lines.size(); i++) {
			for (int j = 0; j < 5; j++) {
				String temp = (String) lines.get(i);
				questionArray[i] = temp.split(","); 
			}
		}
		JSONArray list = new JSONArray();
		for (int i = 0; i < questionArray.length; i++) {
			JSONObject obj = new JSONObject();
			obj.put("id", i+1); 
			for (int j = 0; j < 5; j++) {
				if (j == 2 || j == 6) {
					List<String> tempList = new ArrayList <String>(); 
					String temp = questionArray[i][j];
					tempList = Arrays.asList(temp.split(";")); 
					List<String> trimmedStringList =  tempList.stream().map(String::trim).collect(Collectors.toList());
					obj.put(categoryArray[j], trimmedStringList);
				}
				else {
					obj.put(categoryArray[j], questionArray[i][j]);
				}
			}
			list.add(obj);
		}
		FileWriter file = new FileWriter(outputPath);
		file.write(list.toJSONString());
		file.flush();
		
		System.out.println("JSON written!"); 
	}
}

package opensourcecollagemongo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Scanner;
import java.util.StringTokenizer;
import java.util.concurrent.TimeUnit;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;

// Always be careful with Mongo. Do not run this script without thorough review.

public class MongoDBAtlasClient {
	public static void main(String[] args) {
		
		Scanner scan = new Scanner(System.in);
		System.out.print("Password: "); 
		String pass = scan.next(); 
	
		MongoClientURI uri = new MongoClientURI(
	  "mongodb+srv://bostonlobstergang:" + pass + "@cluster0.plwnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
		MongoClient mongoClient = new MongoClient(uri);
		MongoDatabase database = mongoClient.getDatabase("cluster0");
		MongoCollection<Document> collection = database.getCollection("posts");
		
		
		InputReader r = new InputReader(System.in);
		PrintWriter pw = new PrintWriter(System.out);
		
		pw.println(); 
		pw.close(); 
		
		// Hard code things here. 
		
		
		// collection.deleteMany(new Document());
		// collection.deleteMany(new Document());
		 
	
		
		collection.createIndex(Indexes.ascending("createdAt"), new IndexOptions().expireAfter(3L, TimeUnit.DAYS));
		
	}
	static class InputReader {
		BufferedReader reader;
		StringTokenizer tokenizer;
		
		public InputReader(InputStream stream) {
			reader = new BufferedReader(new InputStreamReader(stream), 32768); 
			tokenizer = null; 
		}
		String next() {
			while (tokenizer == null || !tokenizer.hasMoreTokens()) {
				try {
					tokenizer = new StringTokenizer(reader.readLine());
				} catch (IOException e) {
					throw new RuntimeException(e); 
				}
			}
			return tokenizer.nextToken(); 
		}
		public int nextInt() {
			return Integer.parseInt(next()); 
		}
		public long nextLong() {
			return Long.parseLong(next()); 
		}
		public double nextDouble() {
			return Double.parseDouble(next()); 
		}
	}
}

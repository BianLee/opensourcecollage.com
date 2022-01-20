// remove.js

const { MongoClient, Double } = require("mongodb");
const prompt = require("prompt-sync")({ sigint: true });
const password = prompt.hide("MongoDB Password: ");
async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://bostonlobstergang:" +
    password +
    "@cluster0.plwnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const database = client.db("myFirstDatabase");

    const posts = database.collection("posts");

    const result = await posts.deleteMany({});
    // posts.deleteMany({});
    /* 
    const query = { title: "Join Bumper Ambassador Program!" };
    const result = await posts.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
    */

    // this option prevents additional documents from being inserted if one fails

    // Make the appropriate DB calls
    // await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// add.js

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

    posts.deleteMany({});
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
    const docs = [
      {
        title: "Join Bumper Ambassador Program",
        link: "https://www.joinbumper.com/ambassadors",
        colorcode: "engineering",
        category: "Humanities",
      },
      {
        title: "InterSTEM non-profit",
        link: "https://interstem.us/",
        colorcode: "math",
        category: "Sciences",
      },
      {
        title: "Become a tutor at Interverse!",
        link: "https://interversemedia.org/",
        colorcode: "engineering",
        category: "Humanities",
      },
      {
        title: "Open-source dev @ OSC",
        link: "https://github.com/BianLee/opensourcecollage.com",
        colorcode: "biology",
        category: "IT & Tech",
      },
    ];

    const options = { ordered: true };

    const result = await posts.insertMany(docs, options);

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

import { GraphQLClient } from "graphql-request";
const endpoint = "http://localhost:3000/graphql";
import fs from "fs";
import path from "path";
const cachePaths = {
  tags: path.join(process.cwd(), "src", "kv-store", "tags.json"),
  posts: path.join(process.cwd(), "src", "kv-store", "posts.json"),
  categories: path.join(process.cwd(), "src", "kv-store", "categories.json"),
};

class APIService {
  async put(query, variables = {}) {
    const client = new GraphQLClient(endpoint);
    const result = await client.request(query, variables);
    return result;
  }
  read(type) {
    const filePath = cachePaths[type];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileData);
    }
    return {};
  }
  write(type, data) {
    fs.writeFileSync(cachePaths[type], JSON.stringify(data, null, 2));
  }
}

export default APIService;

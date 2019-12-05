import { ApolloServer } from "apollo-server";
import { Photon } from "@prisma/photon";
import { makeSchema, fieldAuthorizePlugin } from "nexus";
import { nexusPrismaPlugin } from "nexus-prisma";
import * as types from "./resolvers";
import jwt from "jsonwebtoken";

const photon = new Photon();

const nexusPrisma = nexusPrismaPlugin({
  photon: ctx => ctx.photon
});

const schema = makeSchema({
  types,
  plugins: [nexusPrisma, fieldAuthorizePlugin()]
});

const getUser = async (photon: Photon, token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return null;

      let user;

      try {
        user = await photon.users.findOne({
          where: {
            id: decoded.user_id
          }
        });
      } catch (e) {
        throw new Error("User does not exist.");
      }

      return user;
    }
  );
};

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    // get the user token from the headers
    let token = req.headers.authorization || "";

    let user = null;

    if (token) {
      if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }

      // try to retrieve a user with the token
      user = await getUser(photon, token);
    }

    return { photon, user };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

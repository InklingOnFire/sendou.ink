import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { validate } from "class-validator";
import { Top500Placement } from "./entities/Top500Placement";
import { RankedMode } from "../types";

createConnection()
  .then(async (connection) => {
    console.log("Inserting a new user into the database...");
    const placement = new Top500Placement();
    placement.mode = RankedMode.SZ;
    placement.month = 12;
    placement.year = 2021;
    placement.playerId = "123";
    placement.rank = 500;

    const errors = await validate(placement);
    if (errors.length > 0) {
      throw new Error(errors.toString());
    } else {
      await connection.manager.save(placement);
    }
    console.log("Saved a new user with id: " + placement.year);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error));

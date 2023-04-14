import { DataSource } from "typeorm";
import WilderEntity from "../entity/Wilder.entity";
import NoteEntity from "../entity/Note.entity";
import LanguageEntity from "../entity/Language.entity";

// export default new DataSource({
//   type: "sqlite",
//   database: "./wildersdb.sqlite",
//   synchronize: true,
//   entities: [WilderEntity, LanguageEntity, NoteEntity],
//   logging: ["query", "error"],
// });
export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "wilders",
  entities: [WilderEntity, LanguageEntity, NoteEntity],
  synchronize: true,
  logging: false,
});

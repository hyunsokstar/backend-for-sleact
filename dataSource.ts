import { DataSource } from 'typeorm';
import { UsersModel } from './src/users/entities/user.entity';
// import { ChannelChats } from './src/entities/ChannelChats';
// import { ChannelMembers } from './src/entities/ChannelMembers';
// import { Channels } from './src/entities/Channels';
// import { DMs } from './src/entities/DMs';
// import { Mentions } from './src/entities/Mentions';
// import { Users } from './src/entities/Users';
// import { WorkspaceMembers } from './src/entities/WorkspaceMembers';
// import { Workspaces } from './src/entities/Workspaces';
// import dotenv from 'dotenv';
// dotenv.config();

console.log("process.env.DB_USERNAME : ", process.env.DB_USERNAME);
console.log("process.env.CHEATKEY : ", process.env.CHEATKEY);

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: "root",
  password: "1234",
  database: "sleact_db",
  entities: [
    UsersModel,
    // ChannelChats,
    // ChannelMembers,
    // Channels,
    // DMs,
    // Mentions,
    // WorkspaceMembers,
    // Workspaces,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  // synchronize: false,
  // logging: true,
});

export default dataSource;

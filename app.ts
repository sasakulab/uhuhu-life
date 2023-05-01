import express from 'express'
import { Client } from 'pg'

const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const client: any = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
})

client.connect();

// Avoid CORS in development status
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.listen(3000, () => {
    console.log("Start on port 3000.")
})

type Item = {
    itemId?: number,
    name: string,
    price: number,
    includeTax: boolean,
    storeId?: number,
    abbr?: string,
    color?: string
};

type User = {
    userId?: number,
    name: string,
    mail: string,
    storeId?: number,
    isAdmin?: boolean;
}

const items: Item[] = [
    {itemId: 1, name: "item1", price: 198, includeTax: true},
    {itemId: 2, name: "item2", price: 217, includeTax: true, storeId: 1}
]

const users: User[] = [
    {userId: 1, name: "name1", mail: "admin@sasakulab.com", isAdmin: true}
]

app.get('/items', (req: express.Request, res: express.Response) => {
    client
        .query('select * from public.items;')
        .then((qres: any) => res.send(qres.rows))
})

app.get('/items/:id', (req: express.Request, res: express.Response) => {
    client
        .query(`select * from public.items where itemid = ${req.params.id}`)
        .then((qres: any) => res.send(qres.rows))
})

app.get('/time', (req: express.Request, res: express.Response) => {
    client
        .query('select now();')
        .then((qres: any) => res.send(qres.rows))   
})

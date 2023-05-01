import express from 'express'
const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("Hi")
})

app.get('/items', (req: express.Request, res: express.Response) => {
    res.send(items)
})



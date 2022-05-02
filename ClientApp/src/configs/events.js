const now = new Date()

export default [
    {
        id: 0,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 1,
        title: 'Presentation',
        start: new Date(2022, 4, 0),
        end: new Date(2022, 4, 3),
    }
]
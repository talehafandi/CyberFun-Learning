function filter(req, fields) {
    let limit = req.query.limit ? parseInt(req.query.limit) : 50
    let offset = req.query.page ? (req.query.page - 1) * limit : 0
    delete req.query.limit
    delete req.query.page
    return { conditions: req.query, limit, offset };
}

export default filter
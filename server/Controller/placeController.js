const Place = require("../Model/place.model")


exports.createPlace = async (req, res) => {
    const {
        title,
        description,
        country,
        location,
        price,
        averageRating,
        photos,
        availability,
        placeTypes,
        totalGuests,
        bedrooms,
        bathrooms
    } = req.body;

    if (!title || !description || !country || !location || !price || !averageRating || !photos || !placeTypes || !totalGuests || !bedrooms || !bathrooms) {
        return res.status(404).json({ error: 'All Fields are required!' })
    }

    try {
        const newPlace = new Place({
            title,
            description,
            country,
            location,
            price,
            averageRating,
            photos,
            availability,
            placeTypes,
            totalGuests,
            bedrooms,
            bathrooms
        })

        const result = await Place.create(newPlace);
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllPlaces = async (req, res) => {
    const { page = 1, limit = 8, sortBy = 'asc', filterCountry, searchTitle } = req.query;
    const query = {};

    if (filterCountry) {
        query.country = filterCountry;
    }
    if (searchTitle) {
        query.location = { $regex: searchTitle, $options: 'i' };  // 'i' option makes it case-insensitive
    }

    let sort = {};

    if (sortBy === 'asc') {
        sort.price = 1;
    }
    else if (sortBy === 'desc') {
        sort.price = -1;
    }

    const skip = (page - 1) * limit;

    console.log(query);

    try {
        const places = await Place.find(query).sort(sort).limit(Number(limit)).skip(skip);
        const total = await Place.countDocuments(query);

        res.status(200).json({
            places,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit)
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.getSinglePlace = async (req, res) => {
    try {
        const id = req.params.id;
        const place = await Place.findById(id);
        res.status(200).json(place);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.allPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
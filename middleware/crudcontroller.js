const crud = require('./crud');
const user = require('./user');

async function getCrudWithUser() {
    try {
        const result = await crud.aggregate([
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ]);
        return result;
    } catch (error) {
        console.error('Error occurred while performing lookup:', error);
        throw error;
    }
}

module.exports = { crud, user, getCrudWithUser };


const PostCtrl = require('../controllers/Post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, PostCtrl.createPost );

router.delete('/:id',auth,  PostCtrl.deletePost);

router.put('/:id', auth, multer, PostCtrl.modifyPost);

router.get('/:id',auth,  PostCtrl.getOnePost);

router.get('/',auth,  PostCtrl.getAllSPost);

router.post('/:id/like',auth, PostCtrl.likePost);

module.exports = router;
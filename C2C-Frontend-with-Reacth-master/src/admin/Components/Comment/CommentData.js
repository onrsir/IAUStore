import React, { Component } from 'react'
import { getAllProduct, getAllUser, createComment, getAllComment, updateComment, getByCommentId, deleteComment } from '../apiCall'

class CommentData extends Component {
    state = {
        commentId: null,
        commentTitle: null,
        commentContent: null,
        commentCreateDate: null,
        commentScore: null,
        parent_CommentId: null,
        userId: null,
        productId: null,
        error: null,
        errors: [],
        comments: [],
        products: [],
        users: []
    };

    onChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };
    onClickSave = async event => {
        event.preventDefault();

        const body = {
            commentTitle: this.state.commentTitle,
            commentContent: this.state.commentContent,
            commentCreateDate: new Date(),
            commentScore: this.state.commentScore,
            parent_CommentId: this.state.parent_CommentId,
            userId: this.state.userId,
            productId: this.state.productId,

        };

        try {
            const response = await createComment(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllCommentForTable();
        this.deleteForm();


    };
    //Burası Table Fonksiyonu için 

    componentDidMount() {
        this.getAllCommentForTable();
        this.getAllProductForTable();
        this.getAllUsersForTable();
    };

    getAllUsersForTable() {
        getAllUser().then(response => {
            this.setState({
                users: response.data.data
            })
        })
    }
    getAllProductForTable() {
        getAllProduct().then(response => {
            this.setState({
                products: response.data.data

            });
        });
    }

    getAllCommentForTable() {
        getAllComment().then(response => {
            this.setState({
                comments: response.data.data

            });
        });
    }
    //Burası update Fonksiyonları 

    updateComment = async comment => {
        const response = await getByCommentId(comment.commentId);
        this.setState({
            commentId: comment.commentId,
            commentTitle: comment.commentTitle,
            commentContent: comment.commentContent,
            commentCreateDate: comment.commentCreateDate,
            commentScore: comment.commentScore,
            parent_CommentId: response.data.data.parentId,
            userId: response.data.data.userId,
            productId: response.data.data.productId,

        })
    };

    onClickUpdate = async event => {
        event.preventDefault();
        const body = {
            commentId: this.state.commentId,
            commentTitle: this.state.commentTitle,
            commentContent: this.state.commentContent,
            commentCreateDate: this.state.commentCreateDate,
            commentScore: this.state.commentScore,
            parent_CommentId: this.state.parent_CommentId,
            userId: this.state.userId,
            productId: this.state.productId,
        };

        this.setState({ error: null })
        try {
            const response = await updateComment(body);
        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllCommentForTable();
        this.deleteForm();
    };

    //Burası Delete Fonksiyonları 

    onClickDelete = async event => {
        try {
            const response = await deleteComment(event.commentId);

        } catch (error) {
            this.setState({ errors: error.response.data.data })
            { error.response.data.message != "Validation Errors" && this.setState({ error: error.response.data.data }) }
        }
        this.getAllCommentForTable();
        this.deleteForm();


    };
    //form delete 
    deleteForm = event => {
        this.setState({
            commentId: null,
            commentTitle: null,
            commentContent: null,
            commentCreateDate: null,
            commentScore: null,
            parent_CommentId: null,
            userId: null,
            productId: null,
        })
        this.render();
    };

    render() {

        const { products, users, comments, commentId, commentTitle, commentContent, commentCreateDate, commentScore,
            parent_CommentId, userId, productId, error } = this.state;
        return (
            <>

                <div className="form-group">
                    <label className="col-sm-3 control-label">Yorum Başlığı</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={commentTitle != null ? commentTitle : ''} defaultValue={commentTitle} name="commentTitle" onChange={this.onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Yorum İçeriği</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={commentContent != null ? commentContent : ''} defaultValue={commentContent} name="commentContent" onChange={this.onChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-3 control-label">Yorum Skoru</label>
                    <div className="col-sm-9">
                        <input className="form-control" value={commentScore != null ? commentScore : ''} defaultValue={commentScore} name="commentScore" onChange={this.onChange} type="number" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Üst Yorum </label>
                    <div className="col-sm-9">
                        <select className="form-control" value={parent_CommentId != null ? parent_CommentId : ''} defaultValue={parent_CommentId} name="parent_CommentId" onChange={this.onChange} >
                            <option value="0">Üst Yorum Seçilmedi</option>
                            {comments.map((comment) => (
                                <option value={comment.commentId}>{comment.commentId}{" "} -{" "}{comment.commentTitle}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Kullanıcı </label>
                    <div className="col-sm-9">
                        <select className="form-control" value={userId != null ? userId : ''} defaultValue={userId} name="userId" onChange={this.onChange} >
                            <option value="0">Kullanıcı Seçilmedi</option>
                            {users.map((user) => (
                                <option value={user.userId}>{user.userId}{" "} -{" "}{user.userName}</option>
                            ))}
                        </select></div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Ürün </label>
                    <div className="col-sm-9">
                        <select className="form-control" value={productId != null ? productId : ''} defaultValue={productId} name="productId" onChange={this.onChange} >
                            <option value="0">Ürün Seçilmedi</option>
                            {products.map((product) => (
                                <option value={product.productId}>{product.productId}{" "} -{" "}{product.productTitle.substring(0, 20)}</option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-sm-3 control-label"></label>
                    <div className="col-sm-9">
                        <label className="col-sm-9 text-danger">{error}</label>

                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-3 control-label"></label>
                    <div className="col-sm-9">

                        {commentId == null &&
                            <button onClick={this.onClickSave} className='update-btn'>Kayıt Et</button>
                        }
                        {commentId != null &&
                            <>
                                <button onClick={this.onClickUpdate} className='update-btn'>Güncelle</button>

                                <button onClick={this.deleteForm} className='delete-btn'> Sil</button>
                            </>
                        }
                    </div>
                </div>




                <div className="table-responsive">

                    <table className="table table-striped">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Yorum Başlığı</th>
                                <th>Yorum Tarihi</th>
                                <th>Yorum Skoru</th>
                                <th>Üst Yorum Id</th>
                                <th>Kullanıcı Adı</th>
                                <th>Ürün Başlığı</th>
                                <th>Düzenle</th>
                                <th>Sil</th>
                            </tr>
                        </thead>

                        <tbody>
                            {comments.map((comment) => (
                                <tr key={comment.commentId}>
                                    <th>{comment.commentId}</th>
                                    <th>{comment.commentTitle}</th>
                                    <td>{comment.commentCreateDate}</td>
                                    <td>{comment.commentScore}</td>
                                    <td>{comment.parent_commentTitle}</td>
                                    <td>{comment.userName}</td>
                                    <td>{comment.productTitle}</td>
                                    <td><button onClick={() => this.updateComment(comment)} className='apply-now-btn'><i className="fa fa-check"></i></button></td>
                                    <td><button onClick={() => this.onClickDelete(comment)} className='apply-now-btn-color'><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table >

                </div>


            </>
        )
    }
}

export default CommentData;

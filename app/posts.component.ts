
import { Component, OnInit } from "angular2/core";
import { PostService } from "./post.service";
import { SpinnerComponent } from "./spinner.component";
import { UserService } from "./user.service";

@Component({
    templateUrl :'app/posts.component.html',
    styles:[`
    .posts li {
        cursor : default;
    }
    .posts li:hover {
        background : #ecf0f1;
    }
    .list-group-item.active,
    .list-group.item.active:hover,
    .list-group.item.active:focus {
        background-color : #ecf0f1;
        border-color : #ecf0f1;
        color :#2c3e50;
    }
    `],
    providers : [PostService,UserService],
    directives : [SpinnerComponent]
})
export class PostsComponent  implements OnInit{
    posts : [any];
    users : [any];
    isPostLoading;
    isCommentLoading;
    currentPost;
    constructor(private _postService: PostService , private _userService : UserService) {

   } 
    ngOnInit() {
        this.loadUsers();
        this.loadPosts();                        
    }
    
    loadPosts(filter?){
        this.isPostLoading = true;        
        this._postService.getPosts(filter)
            .subscribe(posts=> this.posts = posts,null,()=> {this.isPostLoading = false});
    }

    loadUsers(){
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }

    select(post) {
        this.isCommentLoading = true;
        this.currentPost = post;
        
        this._postService.getComments(post.id)
            .subscribe(comments => this.currentPost.comments = comments,null, ()=> { this.isCommentLoading = false})
    }

    reloadPosts(filter){
        this.currentPost = null;
        this.loadPosts(filter);
    }
}
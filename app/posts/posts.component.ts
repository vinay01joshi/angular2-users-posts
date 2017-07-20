
import { Component, OnInit } from "angular2/core";
import { PostService } from "./post.service";
import { UserService } from "../users/user.service";
import { SpinnerComponent } from "../shared/spinner.component";
import { PaginationComponent } from "../shared/pagination.component";


@Component({
    templateUrl :'app/posts/posts.component.html',
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
    directives : [SpinnerComponent,PaginationComponent]
})
export class PostsComponent  implements OnInit{
    posts = [];
    pagedPosts=[];
    users = [];
    isPostLoading;
    isCommentLoading;
    currentPost;
    pageSize = 10;
    constructor(private _postService: PostService , private _userService : UserService) {

   } 
    ngOnInit() {
        this.loadUsers();
        this.loadPosts();                        
    }
    
    loadPosts(filter?){
        this.isPostLoading = true;        
        this._postService.getPosts(filter)
            .subscribe(posts=> {
                 this.posts = posts;
                 this.pagedPosts = _.take(this.posts,this.pageSize); //this.getPostInPage(1);
            },null,()=> {this.isPostLoading = false});
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

    onPageChanged(page){
        var startIndex = (page -1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts,startIndex),this.pageSize);  //this.getPostInPage(page);
    }

    // private getPostInPage(page){
    //     var result = []

    //     var startingIndex = (page -1) * this.pageSize ;

    //     var endIndex = Math.min(startingIndex + this.pageSize ,this.posts.length);

    //     for(var i = startingIndex ; i < endIndex ; i++)
    //             result.push(this.posts[i]);

    //     return result;
    // }
}
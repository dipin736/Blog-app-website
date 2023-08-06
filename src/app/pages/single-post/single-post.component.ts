  import { Component,OnInit } from '@angular/core';
  import { ActivatedRoute} from '@angular/router';
  import { PostsService } from 'src/app/services/posts.service';

  @Component({
    selector: 'app-single-post',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.css']
  })
  export class SinglePostComponent implements OnInit  {

 
    postData:any
    similarPostArray: any;

    constructor(private postService:PostsService,private router:ActivatedRoute){ }

    ngOnInit(): void {
      this.router.params.subscribe(val=>{
      this.postService.countViews(val['id']);
      
      this.postService.getPostDetails(val['id']).subscribe(post=>{
        this.postData=post
        this.loadSimilarpost(this.postData.category.categoryId);
      })
    })
    }
    loadSimilarpost(catId:any){
      this.postService.loadCategoryPost(catId).subscribe(val=>{
        this.similarPostArray=val;
      })
    }

  }

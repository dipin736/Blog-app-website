import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
  postArray: any;
  categoryobj:any

  constructor(private router:ActivatedRoute,private postService:PostsService){}

  ngOnInit(): void {
    this.router.params.subscribe(val=>{
      console.log(val)
      this.categoryobj=val
      this.postService.loadCategoryPost(val['id']).subscribe(post=>{
        this.postArray=post;
      })
    })
  }

}

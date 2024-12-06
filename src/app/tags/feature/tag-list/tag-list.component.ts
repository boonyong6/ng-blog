import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { PostService } from '../../../posts/data-access/post.service';
import { Page, Tag } from '../../../shared/data-access/types';
import { Paginator } from '../../../shared/utils/paginator';
import { TagLinkComponent } from '../../ui/tag-link/tag-link.component';

@Component({
  selector: 'app-tag-list',
  imports: [MatButtonModule, MatIconModule, TagLinkComponent],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css',
})
export class TagListComponent implements OnInit {
  paginator!: Paginator<Tag>;

  constructor(
    private postService: PostService,
    destroyRef: DestroyRef,
  ) {
    destroyRef.onDestroy(() => {
      this.paginator.destroy();
    });
  }

  get tags(): Tag[] {
    return this.paginator.data;
  }

  ngOnInit(): void {
    this.paginator = new Paginator(this.getTagPage$());
  }

  loadMoreTags(): void {
    this.paginator.loadNext((nextUrl) => this.getTagPage$(nextUrl));
  }

  private getTagPage$(url?: string): Observable<Page<Tag>> {
    return this.postService.getTags({ url });
  }
}

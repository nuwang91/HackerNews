import { Component, OnInit } from '@angular/core';

type NewsType = "job" | "story" | "comment" | "poll" | "pollopt";

interface NewsItem {
  id: number;
  deleted: boolean;
  type: NewsType;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: any;
  poll: any;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: any;
  descendants: number;
}
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsItems: Array<NewsItem> = [];
  dummyBody: string = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, …when an unknown printer took a galley of type and scrambled';

  constructor() {
  }

  ngOnInit(): void {
    let testItem: any = {
      time: 213131432,
      id: 3421432,
      descendants: 21,
      text: 'Testing',
      title: 'test title',
      url: 'www.google.com'
    };
    this.newsItems.push(<any>testItem)
  }

  getBodyText(text: string): string {
    return text ? text : this.dummyBody;
  }

  getComments(numberOfComments: number): string {
    if (numberOfComments > 1) {
      return numberOfComments + ' comments';
    } else if (numberOfComments === 1) {
      return numberOfComments + ' comment';
    } else {
      return 'no comments';
    }
  }

  getTime(time: number): string {
    return time.toString();
  }

}

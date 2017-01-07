import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'youtube',
    templateUrl: './youtube.component.html'
})
export class YoutubeComponent implements OnInit {
    @Input() videoId;
    src;
    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {
           
    }
    ngOnChanges(change){
        let url = "https://www.youtube.com/embed/"+change.videoId.currentValue+"?rel=0&amp;showinfo=0"
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);  
    	
    }

}

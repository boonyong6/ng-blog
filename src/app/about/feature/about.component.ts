import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    imports: [NgOptimizedImage],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent {}

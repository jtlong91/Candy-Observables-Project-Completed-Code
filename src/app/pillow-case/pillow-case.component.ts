import { Candy } from './../models/candy.model';
import { PillowCaseService } from './pillow-case.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pillow-case',
  templateUrl: './pillow-case.component.html',
  styleUrls: ['./pillow-case.component.css'],
})
export class PillowCaseComponent implements OnInit, OnDestroy {
  // Create local Subscription
  myCandySub: Subscription;

  myCandies: Candy[] = [];

  constructor(private pillowCaseService: PillowCaseService) {}

  ngOnInit(): void {
    this.myCandies = this.pillowCaseService.getMySecretStash();
    // Subscribe to the a Subject on pillowCase and store in a local Subscription
    this.myCandySub = this.pillowCaseService.candiesUpdated.subscribe(updatedCandies => (this.myCandies = updatedCandies));

  }

  ngOnDestroy(): void {
    this.myCandySub.unsubscribe();
  }

  onEatAllCandy(): void {
    this.pillowCaseService.clearCandy();
  }
}

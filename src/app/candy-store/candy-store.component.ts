import { PillowCaseService } from './../pillow-case/pillow-case.service';
import { CandyStoreService } from './candy-store.service';
import { Candy } from './../models/candy.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-candy-store',
  templateUrl: './candy-store.component.html',
  styleUrls: ['./candy-store.component.css'],
})
export class CandyStoreComponent implements OnInit, OnDestroy {
  // Create local Subscription
  candiesForSaleSub: Subscription;

  candiesForSale: Candy[] = [];

  constructor(
    private candyStoreService: CandyStoreService,
    private pillowCaseService: PillowCaseService
  ) {}

  ngOnInit(): void {
    this.candiesForSale = this.candyStoreService.getCandiesForSale();
    // Subscribe to the a Subject on candyStore and store in a local Subscription
    this.candiesForSaleSub = this.candyStoreService.candiesUpdated.subscribe(updatedCandies => (this.candiesForSale = updatedCandies));
  }

  ngOnDestroy(): void {
    this.candiesForSaleSub.unsubscribe();
  }

  onSaveCandyToBag(candyName: string): void {
    this.pillowCaseService.addNewCandy(candyName);
  }

  onNewDelivery() {
    this.candyStoreService.addFiveCandies();
  }
}

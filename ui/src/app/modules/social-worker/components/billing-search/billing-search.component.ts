// billing-search.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-billing-search',
  templateUrl: './billing-search.component.html',
  styleUrls: ['./billing-search.component.scss']
})
export class BillingSearchComponent implements OnInit {
  criterias: string[] = ['Under 5', 'Poverty', 'Elderly'];

  bills: any[] = [
    {
      id: 1,
      date: '2020-09-12T00:00:00.000+0000',
      name: 'Jane Doe',
      age: 30,
      isExempted: false,
      items: [
        {
          item: 'Consultation',
          cost: 1000,
          qty: null
        },
        {
          item: 'Registration',
          cost: 500,
          qty: null
        }
      ]
    },
    {
      id: 2,
      date: '2020-09-12T00:00:00.000+0000',
      name: 'John Orlando',
      age: 2,
      isExempted: true,
      items: [
        {
          item: 'Ampicillin+Cloxacillin 250mg+250mg',
          cost: 100,
          qty: 16
        },
        {
          item: 'Paracetamol 120mg/5ml',
          cost: 3000,
          qty: 1
        },
        {
          item: 'Multivitamin 100ml',
          cost: 4500,
          qty: 1
        }
      ]
    },
    {
      id: 3,
      date: '2020-09-09T00:00:00.000+0000',
      name: 'James John',
      age: 93,
      isExempted: true,
      items: [
        {
          item: 'Tramadol Hydrochloride 50mg',
          cost: 50,
          qty: 36
        }
      ]
    }
  ];

  totalCostsObject: any = {};
  quoteToShow = this.bills.length > 0 ? this.bills[0]['id'] : null;
  patientDetails: any;

  showPatientDetails: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.generateTotalCostsObject();
  }

  showQuote(quoteid) {
    if (this.quoteToShow == quoteid) {
      this.quoteToShow = null;
    } else {
      this.quoteToShow = quoteid;
    }
  }

  viewPatient(patient) {
    this.showPatientDetails = true;
    this.patientDetails = { ...patient, isExempted: this.checkExemptionStatus(patient) };
  }

  checkExemptionStatus(patient): boolean {
    // Implement your exemption logic here
    // Example: Check if the patient meets exemption criteria
    return patient.age < 18 || patient.patientType === 'Elderly';
  }

  generateTotalCostsObject() {
    _.each(this.bills, (billToCalcCost) => {
      let cost = 0;
      _.each(billToCalcCost['items'], (item) => {
        cost = cost + (item['qty'] ? item['cost'] * item['qty'] : item['cost']);
      });

      this.totalCostsObject[billToCalcCost['id']] = cost;

      cost = 0;
    });
  }
}

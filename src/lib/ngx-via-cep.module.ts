import { NgModule } from '@angular/core';
import { NgxViaCepComponent } from './ngx-via-cep.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NgxViaCepComponent],
  imports: [HttpClientModule],
  exports: [HttpClientModule, NgxViaCepComponent]
})
export class NgxViaCepModule {}

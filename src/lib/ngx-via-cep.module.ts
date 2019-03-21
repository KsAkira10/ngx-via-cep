import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxViaCepConfiguration } from './ngx-via-cep.configuration';
import { NgxViaCepService } from './ngx-via-cep.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [NgxViaCepService]
})
export class NgxViaCepModule {
  public static forRoot(
    configurationFactory: () => NgxViaCepConfiguration
  ): ModuleWithProviders {
    return {
      ngModule: NgxViaCepModule,
      providers: [
        { provide: NgxViaCepConfiguration, useFactory: configurationFactory }
      ]
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: NgxViaCepModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'NgxViaCepModule is already loaded. Import in your base AppModule only.'
      );
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}

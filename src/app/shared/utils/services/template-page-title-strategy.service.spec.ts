import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';
import { environment as env } from '../../../../environments/environment';
import { TemplatePageTitleStrategy } from './template-page-title-strategy.service';

describe('TemplatePageTitleStrategyService', () => {
  let service: TemplatePageTitleStrategy;
  let titleServiceSpy: jasmine.SpyObj<Title>;

  beforeEach(() => {
    const _titleServiceSpy = jasmine.createSpyObj<Title>(['setTitle']);

    TestBed.configureTestingModule({
      providers: [{ provide: Title, useValue: _titleServiceSpy } as Provider],
    });
    service = TestBed.inject(TemplatePageTitleStrategy);
    titleServiceSpy = TestBed.inject(Title) as jasmine.SpyObj<Title>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#updateTitle should decorate title from route', () => {
    const routeTitle = 'Home';
    spyOn(service, 'buildTitle').and.returnValue(routeTitle);

    service.updateTitle({} as RouterStateSnapshot);

    expect(titleServiceSpy.setTitle).toHaveBeenCalledWith(
      `${routeTitle}${env.documentTitleSuffix}`,
    );
  });
});

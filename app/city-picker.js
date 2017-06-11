import mustache from 'mustache';
import Base from '../meathill-component-core/app/base';
import * as tpl from './template';

let count = 0;

export default class CityPicker extends Base {
  constructor(target, options) {
    super(target, options);
  }

  createElement(options) {
    // 生成一个隐藏 input 用来存放城市 id
    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = this.target[0].name;
    this.target.attr('name', input.name + '-label');
    this.realTarget = $(input).insertAfter(this.target);

    // 插入页面的容器，用来定位
    let container = this.container = document.createElement('div');
    container.className = 'tqb-city-picker-desktop-container';
    $(container).insertAfter(this.target);

    // 选择器
    this.$el = $(tpl.framework);
    container.appendChild(this.$el[0]);
    this.$el.removeClass('out');

    fetch(options.url || './assets/city.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(json => {
        this.data = options.data = json.map( (cities, index) => {
          cities.selected = index === 0;
          cities.index = count + index;
          return cities;
        });
        count += json.length;
        let nav = mustache.render(tpl.nav, { all: json });
        let sheets = json.map( cities  => CityPicker.createSheet(cities));
        this.$el.removeClass('loading')
          .html(nav + sheets.join(''));
      });
  }

  static createSheet(cities) {
    return mustache.render(tpl.sheet, cities);
  }

  delegateEvents(options) {
    this.$el
      .on('click', '.city', event => {
        this.$el.find('.active').removeClass('active');
        let target = event.currentTarget;
        this.target.val(target.textContent);
        this.realTarget.val(target.getAttribute('href').substr(2));
        target.className = 'active';
        this.hide();
      });
    event.preventDefault();
  }

  setValue() {
    let value = this.realTarget.val();
    if (!value) {
      return;
    }
    this.$el.find(`[href='#/${value}']`).addClass('active');
  }
}
const name = 'tqb-city-picker-desktop';


export const framework = `
<div class="${name} out loading">
  <label>加载城市列表，请稍候</label>
  <div>
    <i class="fa fa-spin fa-spinner fa-3x"></i>
  </div>
</div>
`;

export const sheet = `
<input type="radio" name="${name}-sheet" id="${name}-sheet-{{index}}" value="{{index}}">
<label for="${name}-sheet-{{index}}">{{label}}</label>
<dl>
  {{#countries}}
  <dt>{{name}}</dt>
  <dd>
    {{#cities}}
    <a class="city" href="#/{{id}}">{{value}}</a>
    {{/cities}}
  </dd>
  {{/countries}}
</dl>
`;
const name = 'tqb-city-picker-desktop';


export const framework = `
<div class="${name} out loading">
  <label>加载城市列表，请稍候</label>
  <div>
    <i class="fa fa-spin fa-spinner fa-3x"></i>
  </div>
</div>
`;

export const nav = `
{{#all}}
<input type="radio" name="${name}-sheet" id="${name}-nav-{{index}}" class="${name}-nav-{{index}}" value="{{index}}" {{#selected}}checked{{/selected}}>
<label for="${name}-nav-{{index}}">{{area}}</label>
{{/all}}
`;

export const sheet = `
<dl class="${name}-sheet-{{index}}">
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
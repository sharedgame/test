class Main
{
  async run()
  {
    E('main').clr().text(await GetJSON('test.json'));
  }
}

new Main().run();

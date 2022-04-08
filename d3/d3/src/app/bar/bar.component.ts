import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg: any;
  private margin = 50;
  private width = 1500 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private BackEndService: BackendService ) { }

  ngOnInit(): void {

    // this.test();
    this.BackEndService.getData().subscribe((data) => {
      console.log(data);
      // data = JSON.parse(JSON.stringify(data)) as JSON;
      let data_obj = JSON.parse(JSON.stringify(data));
      console.log(data_obj);
      console.log(data_obj[0]["data"]);
      this.data = data_obj[0]["data"];
      this.createSvg();
      this.drawBars(this.data);
      // console.log(data["data"])
      // return data;
    })
    // Comment out the line above and uncomment the line below when you're
    // ready to try fetching JSON from a REST API endpoint.
    // Comment out the private data [] above too.
    // d3.json('https://api.jsonbin.io/b/5eee6a5397cb753b4d149343').then((data: any) => this.drawBars(data));
  }

  private createSvg(): void {
      this.svg = d3.select("figure#bar")
      .append("svg")
      .style("overflow","visible")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
      // Create the X-axis band scale
      const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Artist))
      .padding(0.2);

      // Draw the X-axis on the DOM
      this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

      // Create the Y-axis band scale
      const y = d3.scaleLinear()
      .domain([0, 4000000])
      .range([this.height, 0]);

      // Draw the Y-axis on the DOM
      this.svg.append("g")
      .call(d3.axisLeft(y));

      // Create and fill the bars
      this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.Artist))
      .attr("y", (d: any) => y(d.Followers))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.Followers))
      .attr("fill", "#d04a35");
      
      this.svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", this.width)
      .attr("y", this.height - 6)
      .text("Artist");

      this.svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Followers");
  }




}




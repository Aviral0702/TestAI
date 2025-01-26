import React from "react";
import { Card,CardHeader,CardTitle,CardContent } from "./ui/card";
function StatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-600 text-2xl font-semibold">0</div>
            <div className="text-sm text-gray-600">Total APIs</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 text-2xl font-semibold">0</div>
            <div className="text-sm text-gray-600">Tests Run</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-purple-600 text-2xl font-semibold">0%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-orange-600 text-2xl font-semibold">0</div>
            <div className="text-sm text-gray-600">Active Tests</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;

import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GridIcon, ListIcon } from 'lucide-react';

export const FilterBar = () => {
  const [filter, setFilter] = useState('all');
  const [ownership, setOwnership] = useState('anyone');
  const [sortBy, setSortBy] = useState('last-opened');
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex space-x-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All boards</SelectItem>
            <SelectItem value="owned">Owned by me</SelectItem>
            <SelectItem value="last-opened">Last opened</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ownership} onValueChange={setOwnership}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Owned by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anyone">Owned by anyone</SelectItem>
            <SelectItem value="me">Owned by me</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-opened">Last opened</SelectItem>
            <SelectItem value="recently-created">Recently created</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex space-x-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          onClick={() => setViewMode('grid')}
        >
          <GridIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          onClick={() => setViewMode('list')}
        >
          <ListIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
